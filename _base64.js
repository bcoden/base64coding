/**
 * [Base64 description]
 * Resources: http://asecuritysite.com/coding/asc2
 */
var Base64 = function () {
    'use strict';
    this.state = '';
    this.base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    /**
     * [convertToBinary description]
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */

    this.encode = function (string) {
        // verify that this is a valid ascii char
        if (/([^u0000-\u00ff])/.test(string)) {
            throw new Error("Can't base 64 encode non-ASCII charcaters");
        }

        var i = 0, cur, prev, byteNum, result =[];

        while (i < string.length) {
            cur = string.charCodeAt(1);
            console.log(string);
            console.log(cur >> 2);return;
            byteNum = i % 3; // divisible by three

            switch (byteNum) {
                case 0: // first byte
                    // shifts two bits to the right
                    // eg 0000000001100001 -> 0000000000011001 creates new char
                    result.push(this.base64.charAt(cur >> 2));
                    break;
                case 1: // second byte
                    result.push(this.base64.charAt((prev & 3) << 4 | (cur >> 4)));
                    break;
                case 2: // third byte
                    result.push(this.base64.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                    result.push(this.base64.charAt(cur & 0x3f));
                    break; 
            }

            prev = cur;
            i++;
        }

        // compensate for padding
        if (byteNum == 0) {
            result.push(this.base64.charAt((prev & 3) << 4));
            result.push("==");
        } else {
            result.push(this.base64.charAt((prev & 0x0f) << 2));
            result.push("=");
        }

        return result.join("");
    }
};

Base64.prototype = {
    encode: this.encode
};

var dataEncrypt = new Base64();
console.log(dataEncrypt.encode('hat'));