class FormSubmit {
  constructor({ form, button, success, error }) {
    this.form = document.querySelector(form);
    this.formButton = document.querySelector(button);
    this.url = this.form?.getAttribute("action");
    this.success = success;
    this.error = error;
    this.sendForm = this.sendForm.bind(this);
  }

  displayMessage(message) {
    this.form.innerHTML = message;
  }

  getFormObject() {
    return [...this.form.querySelectorAll("[name]")].reduce((obj, field) => {
      obj[field.name] = field.value;
      return obj;
    }, {});
  }

  async sendForm(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
    try {
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displayMessage(this.success);
    } catch {
      this.displayMessage(this.error);
    }
  }

  init() {
    this.formButton?.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
}).init();