document.writeln('Hello, world!');


/* defines new methods */
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

