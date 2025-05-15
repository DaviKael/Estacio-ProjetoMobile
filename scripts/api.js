import _default from '@expo/vector-icons/build/EvilIcons';
import axios from 'axios';

axios.get('http://127.0.0.1:8000')
  .then(
    function pegarNoticias(response) {
        const noticias = response.data;
        console.log('Conexão realizada: ', noticias);
  })
  .catch(function (error) {
    console.log('Erro: ', response.status, error);
  });
