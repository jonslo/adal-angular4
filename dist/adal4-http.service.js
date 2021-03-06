"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
/**
 *
 *
 * @export
 * @class Adal4HTTPService
 */
var Adal4HTTPService = (function () {
    /**
     * Creates an instance of Adal4HTTPService.
     * @param {Http} http
     * @param {Adal4Service} service
     *
     * @memberOf Adal4HTTPService
     */
    function Adal4HTTPService(http, service) {
        this.http = http;
        this.service = service;
    }
    Adal4HTTPService_1 = Adal4HTTPService;
    /**
     *
     *
     * @static
     * @param {Http} http
     * @param {Adal4Service} service
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.factory = function (http, service) {
        return new Adal4HTTPService_1(http, service);
    };
    /**
     *
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.get = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Get });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.post = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.delete = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Delete });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.patch = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Patch, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.put = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Put, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @param {string} url
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.head = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Put });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    /**
     *
     *
     * @private
     * @param {string} url
     * @param {RequestOptionsArgs} options
     * @returns {Observable<string>}
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.sendRequest = function (url, options) {
        var _this = this;
        // make a copy
        var options1 = new http_1.RequestOptions();
        options1.method = options.method;
        options1 = options1.merge(options);
        var resource = this.service.GetResourceForEndpoint(url);
        var authenticatedCall;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .flatMap(function (token) {
                    if (options1.headers == null) {
                        options1.headers = new http_1.Headers();
                    }
                    options1.headers.append('Authorization', 'Bearer ' + token);
                    return _this.http.request(url, options1)
                        .catch(_this.handleError);
                });
            }
            else {
                authenticatedCall = Observable_1.Observable.throw(new Error('User Not Authenticated.'));
            }
        }
        else {
            authenticatedCall = this.http.request(url, options).map(this.extractData).catch(this.handleError);
        }
        return authenticatedCall;
    };
    /**
     *
     *
     * @private
     * @param {Response} res
     * @returns
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = {};
        // if there is some content, parse it
        if (res.status !== 204) {
            body = res.json();
        }
        return body || {};
    };
    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal4HTTPService
     */
    Adal4HTTPService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead
        return Observable_1.Observable.throw(error);
    };
    Adal4HTTPService = Adal4HTTPService_1 = __decorate([
        core_1.Injectable()
    ], Adal4HTTPService);
    return Adal4HTTPService;
    var Adal4HTTPService_1;
}());
exports.Adal4HTTPService = Adal4HTTPService;
