class Api::MessagesController < ApplicationController
  def create
    @friend = User.find(message_params[:friend_id])
    if (message_params[:chat_id] == "")
      @chat = current_user.chats.create(creator: current_user)
      @chat.chat_memberships.create(user: @friend)
      new_chat = true
    else
      @chat = current_user.chats.find(message_params[:chat_id])
      new_chat = false
    end
    
    @message = current_user.messages.new(chat: @chat, body: message_params[:body])
    if @message.save
      chat_data = render('/api/chats/show.json')
      if new_chat
        ChatsChannel.broadcast_to @friend, chat_data
        ChatsChannel.broadcast_to current_user, chat_data
      else
        MessagesChannel.broadcast_to @chat, chat_data
      end
      head :ok
    end
  end
  
  private
  
  def message_params
    params.require(:message).permit(:body, :chat_id, :friend_id)
  end
end
