class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :email
  has_one :profile_picture, serializer: ProfilePictureSerializer

  attribute :profile_picture_url do |object|
  if  object.profile_picture.present?
      Rails.application.routes.url_helpers.rails_blob_path(object.profile_picture.image, only_path: true)
  else
    nil
  end

  end
end
