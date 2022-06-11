class ProfilePictureSerializer
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :image
  has_one :user

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image, host: ENV["SERVER_URL"])
      }
    end
  end
end
