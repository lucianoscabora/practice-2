import axios from 'axios';
import { useEffect, useState } from 'react';
import Paginate from './components/Paginate';
import './style/style.css'



function App() {

    const [animes, setAnimes] = useState({});
    const [currentPage, setCurrentPage] = useState(3);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const testData = animes.data;
    const animesPerPage = testData?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
     };
   
    useEffect(() => {
        axios.get('https://kitsu.io/api/edge/anime?page[limit]=20')
        .then(response => {
            setAnimes(response.data);
        })
    }, [])


    const previousPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage -1);
        }
    }

    const nextPage = () => {
        if (currentPage !== Math.ceil(animes.data.length / postsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

   
return (
  <div className="main-container">
        {animesPerPage && ( 
          // fazer um map para converter no JSX e apresentar na tela
                <>
                <ul className="animes-list">
                    {animesPerPage?.map((item) => (
                        <li key={item.id} className="list-items">
                            <img src={item.attributes.posterImage.small} alt="each anime images" />
                            <br />{item.attributes.canonicalTitle}
                            <br /> Quantidade de episódios: {item.attributes.episodeCount}
                        </li>
                    ))}

                </ul>
                
                <Paginate
                    postsPerPage={postsPerPage}
                    totalPosts={animes.data.length}
                    paginate={paginate}
                    previousPage={previousPage}
                    nextPage={nextPage} /> 
                    </>
          
                    )}
  </div>
);
}

export default App;