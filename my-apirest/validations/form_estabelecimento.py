from wtforms import Form, StringField, validators


class RegistrationForm(Form):
    nome = StringField('Username', [validators.Length(min=4, max=25)])
    cnpj = StringField('Email Address', [validators.Length(min=6, max=35)])
    bairro = StringField('Email Address', [validators.Length(min=6, max=35)])
    cidade = StringField('Email Address', [validators.Length(min=6, max=35)])
    telefone = StringField('Email Address', [validators.Length(min=6, max=35)])
