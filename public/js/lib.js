function cannotReq(url, j, fCallback) {
    var _script = document.createElement('script');
    _script.setAttribute('charset', 'utf8');
    _script.setAttribute('type', 'text/javascript');
    //_script.setAttribute('src', 'http://localhost:43002/whoisyourdaddy');
    _script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(_script);

    //_script.onload = _script.onreadystatechange = function () {
    //_script.onload = function () {
    //    //if (this.readyState == 'loaded' || this.readyState == 'complete') {
    //    //    _script.parentNode.removeChild(_script);
    //    //    if (fCallback) fCallback();
    //    //}
    //    _script.parentNode.removeChild(_script);
    //    console.log('loaded')
    //    //if (fCallback) fCallback();
    //};
    _script.onerror = function () {
        //if (this.readyState == 'loaded' || this.readyState == 'complete') {
        //    _script.parentNode.removeChild(_script);
        //    if (fCallback) fCallback();
        //}
        _script.parentNode.removeChild(_script);
        if (fCallback) fCallback(j);
    };
}