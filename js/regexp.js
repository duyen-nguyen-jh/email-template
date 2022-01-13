const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*]).{8,}$/;

const mail1 = `" duyen123"@12345.com`;
const mail2 = `disposable.style.email.with+symbol@example.com`;
const mail3 = `other.email-with-hyphen@example.com`;
const mail4 = `postmaster@[123.123.123.123]`;
console.log(mail1, emailRegExp.test(mail1));
console.log(mail2, emailRegExp.test(mail2));
console.log(mail3, emailRegExp.test(mail3));
console.log(mail4, emailRegExp.test(mail4));

const pass1 = `duyen12345678`;
const pass2 = `abcdDef12345!`;
const pass3 = `!!!abcde@Eab`;
const pass4 = `123@4567890E`;
console.log(pass1, passwordRegExp.test(pass1));
console.log(pass2, passwordRegExp.test(pass2));
console.log(pass3, passwordRegExp.test(pass3));
console.log(pass4, passwordRegExp.test(pass4));
