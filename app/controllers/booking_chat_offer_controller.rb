class BookingChatOfferController < ApplicationController
    def new
        @booking_chat = BookingChat.find(offer_params[:battler_booking_offer_id])
        @booking = BattlerBookingOffer.find_by(id: offer_params[:battler_booking_offer_id])
        @booking.update(number_of_rounds: offer_params[:number_of_rounds], 
          minutes_per_round: offer_params[:minutes_per_round],
          amount_offered: offer_params[:amount_offered], 
          date: offer_params[:booking_date]
        )

        @booking.save
        @hash = BattlerBookingOfferSerializer.new(@booking).serializable_hash[:data]
        # broadcasts to the serialized json to the room once created
        BookingChatChannel.broadcast_to(@booking_chat, @hash)
        render json: @hash
    end

    def index
        @offer = BattlerBookingOffer.find_by(id: chat_params[:id])
        @hash = BattlerBookingOfferSerializer.new(@offer).serializable_hash[:data]
        if hash.present?
          render json: @hash
        else
          render json: {
            status: {message: "Error"}
          }, status: :unprocessable_entity
        end
    end

    private

    def offer_params
      params.permit(:battler_booking_offer_id, :battler_id, :booker_user_id, :number_of_rounds, :minutes_per_round, :amount_offered, :booking_date)
    end

    def chat_params
      params.permit(:id)
    end
end 