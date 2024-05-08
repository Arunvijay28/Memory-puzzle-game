class RegistrationsController < ApplicationController
    def new
        @user=User.new
    end

    def create
        @user = User.new(user_params)
        if @user.save
          session[:user_id] = @user.id
          redirect_to "/sign_in", notice: "Successfully created account"
        else
          render :new
        end
    end
    
    private
    
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def hi
    end
    
end
