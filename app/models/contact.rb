class Contact < MailForm::Base
  attribute :name,      :validate => true
  attribute :email,     :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :message,   :validate => true
  attribute :nickname,  :captcha  => true

  def headers
    {
      :subjext => "Contact Form",
      :to => "tasiovictoria@gmail.com",
      :from => %("#{name}" <#{email}>)
    }
  end
end
