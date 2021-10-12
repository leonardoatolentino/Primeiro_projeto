import { useEffect, useState } from 'react';
import './filme-inf.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { toast } from "react-toastify";

export default function Filme(){

  const {id} = useParams();
  const history = useHistory();
  const [filme, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get(`r-api/?api=filmes/${id}`);
      
      if(response.data.length === 0){ //tentou acessar com id não existe
        history.replace('/');
        return;
      }

      setFilmes(response.data);
      setLoading(false);
    }

    loadFilmes();

    return () =>{
      console.log('COMPONETE DESMONTADO');
    }
    
  }, [history,id]);


  function salvaFilme(){

    const minhaLista = localStorage.getItem('filmes');
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //Se tiver algum filme saldo com esse mesmo Id precisa ignorar
    const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id)

    if (hasFilme){
      toast.error('você já possui esse filme salvo');
      return;
      //para execução do código aqui.
    }


    filmesSalvos.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!!');
   

  
  }

  if(loading){
    return(
      <div className="filme-info">
      <h1>Carregando seu Filme</h1>
    </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome} />

      <h3>Sinopse</h3>
      {filme.sinopse}

      <div className="botoes">
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a target="_blank" href={`https://www.youtube.com/results?search_query=${filme.nome}`}>
            Treiler</a>
        </button>
      </div>
    </div>
  );
}