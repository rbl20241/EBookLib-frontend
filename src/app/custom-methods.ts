export { }; // this will make it module

declare global { // this is important to access it as global type String

  interface Date {
    yyyymmdd(): string;
  }

}

Date.prototype.yyyymmdd = function() {
  const mm = this.getMonth() + 1; // getMonth() is zero-based
  const dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-');
};
