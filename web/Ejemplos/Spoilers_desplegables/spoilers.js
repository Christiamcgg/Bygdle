window.addEventListener('load', function() {

    var spoilers = document.getElementsByClassName('spoiler-box');

    for(var i = 0; i < spoilers.length; i++) {
        var title = spoilers[i].getElementsByClassName('spoiler-title');
        var content = spoilers[i].getElementsByClassName('spoiler-content');

        if(!title || !content || !title.length || !content.length)
            continue;

        title = title[0];
        title.box = content[0];

        title.title = 'Clic para abrir';

        title.addEventListener('click', function() {
            this.box.style.display = (this.box.style.display == '') ? 'block' : '';

            this.title = this.title == 'Clic para abrir' ? 'Clic para cerrar' : 'Clic para abrir';
        });
    }

});