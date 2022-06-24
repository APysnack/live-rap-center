class Mutations::CreatePost < Mutations::BaseMutation
    argument :user_id, Integer, required: true
    argument :title, String, required: true
    argument :body, String, required: true

    field :post, Types::Models::PostType, null: false
    field :errors, [String], null: false

    def resolve(user_id:, title:, body:)
        post = Post.new(user_id: user_id, title: title, body: body)

        if post.save 
            {
                post: post,
                errors: []
            }
        else
            {
                post: nil,
                errors: post.errors.full_messages
            }
        end
    end
end