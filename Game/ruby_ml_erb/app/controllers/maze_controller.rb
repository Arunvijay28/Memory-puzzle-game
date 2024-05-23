require 'open3'

class MazeController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:record_audio]
  def index
  end

  def record_audio
    script_path = 'D:\Arun\SSN\sem-6\web_programming\ruby_ml\lib\assets\python\record_aud.py'
    output, status = Open3.capture2e("python #{script_path}")
    output=output.split("?")[1]
    if status.success?
      render json: { status: 'success', output: output }
    else
      render json: { status: 'error',output: output }
    end
end

end
