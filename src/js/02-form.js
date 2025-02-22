const form = document.querySelector(".feedback-form");
const LOCAL_STORAGE_KEY = "feedback-form-state";

form.addEventListener("input", onFormInput);
form.addEventListener("submit", onFormSubmit);

function onFormInput() {
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formObject));
}

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const formObject = {};
  let allFieldFilled = true;

  formData.forEach((value, key) => {
    if (value === "") {
      allFieldFilled = false;
    } else {
      formObject[key] = value;
    }
  });

  if (allFieldFilled) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formObject));
    console.log(formObject);
    form.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } else {
    alert("Tüm Alanları Doldurun");
  }
}
window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedData) {
    form.email.value = savedData.email;
    form.message.value = savedData.message;
  }
});
