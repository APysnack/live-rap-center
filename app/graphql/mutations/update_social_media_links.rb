module Mutations
    class UpdateSocialMediaLinks < BaseMutation
        # Custom object defined in base_input_object.rb
        argument :attributes, [Types::SocialMediaLinkAttributes]
        argument :user_id, Integer, required: true

        type [Types::SocialMediaLinkType]

        def resolve(user_id: nil, attributes: nil)
            attributes.each do |attribute|
                link = SocialMediaLink.find_by(user_id: user_id, social_media_platform_id: attribute.social_media_platform_id)
                if link.present?
                    link.url = attribute.url
                    link.save
                else
                    SocialMediaLink.create(user_id: user_id, social_media_platform_id: attribute.social_media_platform_id, url: attribute.url)
                end
            end
            SocialMediaLink.where(user_id: user_id)
        end

    end
end