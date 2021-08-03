import Loader from "Components/Loader";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import ReactPlsyer from "react-player";
import {Link} from "react-router-dom";

const Container = styled.div`
    height: calc(100vh - 50px);    
    width: 100%;
    position: relative;
    padding: 50px;
`;
const Backdrop = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%; 
    background-image: url(${props=> props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
`;
const Content = styled.div`
    display: flex;
    height: 100%;    
    position: relative;
`;
const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;
const Data = styled.div`
    width: 70%;
    margin-left: 10px;
    overflow: scroll;
`;
const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 10px;
`;
const ItemContainer = styled.div`
    margin : 20px 0;
    display: flex;
    align-items: center;
`;
const Item = styled.span``;
const Divider = styled.span`
    padding: 0 10px;
`;
const Imdb = styled.img`
    width: 30px;
`;
const OverView = styled.p`
    font-size: 12px;
    margin-top:5px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;
const Middletitle = styled.div`
    margin-top: 10px;
`;
const Middlename = styled.div`
    margin-top: 5px;  
    display: flex;
    align-items: center;
    opacity: 0.7;
`;
const ButtonContainer = styled.div`
    margin-top: 20px;
`;
const ButtonItem = styled.button`
    border: solid 2px black ;
    background-color: transparent;
    cursor: pointer;
    color: white;
    height: 25px;
    padding: 0 15px;
    
    &:disabled{
        border: solid 1px black;
        background-color: black;
        opacity: 0.8;
        cursor: default;
    }
`;
const ProductionContainer = styled.div`
    
`;
const VideosContainer = styled.div`
    margin-top: 10px;
    
    display: flex;
    flex-direction: row;
    overflow: scroll;    
`;
const VideoItem = styled.div`
    padding-right : 10px;        
`;
const SeasonsContainer = styled.div`
    margin-top: 10px;    
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: scroll;    
`;

const SeasonsImage = styled.div`
    background-image: url(${props => props.bgImage});
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    height: 150px;
    width: 120px;
    transition: opacity 0.1s linear;
`;
const SeasonsName = styled.span`
    bottom: 50%;
    left: 10px;
    font-size: 20px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.1s linear;
`;
const SeasonsItem = styled.div`
    padding-right : 10px;
    position: relative;
    &:hover{ 
        ${SeasonsImage} {
            opacity: 0.3;
        }   
        ${SeasonsName} {
            opacity: 1;
        }      
    }
`;


const DetailPresenter = ({result, error,loading, tabIndex, handleTabs }) => (
    loading ? 
    <>
        <Helmet>
        <title>Loading | Nomflix</title>
        </Helmet>  
        <Loader /> 
    </>: 
    <Container>{console.log(result)}
        <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name}
         | Nomflix</title>
        </Helmet>  
   
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Content>
            <Cover bgImage={
                result.poster_path 
                 ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                 : require("../../assets/noPosterSmall.png").default    
            }
            />
            <Data>
                <Title>{result.original_title
                        ? result.original_title 
                        : result.original_name}</Title>
                <ItemContainer>
                    <Item>{result.release_date 
                    ? result.release_date.substring(0,4) 
                    : result.first_air_date.substring(0,4)}
                    </Item>
                    <Divider>∙</Divider>
                    <Item>{(result.runtime || result.runtime === 0) 
                    ? result.runtime 
                    : result.episode_run_time[0]} min
                    </Item>
                    <Divider>∙</Divider>
                    <Item>{result.genres &&
                         result.genres.map( (genre, index) => 
                            index === result.genres.length - 1 
                            ? genre.name : `${genre.name} / `)
                    }
                    </Item>      
                    {result.imdb_id 
                    ? <><Divider>∙</Divider>
                        <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                            <Imdb src={require("../../assets/imdb.png").default} />
                        </a>                       
                     </>
                    :""}              
                </ItemContainer>
                <OverView>{result.overview}</OverView>
                <ButtonContainer>
                    {tabIndex === 0 
                    ? <ButtonItem disabled>Production infomation</ButtonItem>
                    : <ButtonItem onClick={()=> handleTabs(0)}>Production infomation</ButtonItem> }                    
                    {tabIndex === 1 
                    ? <ButtonItem disabled>Videos</ButtonItem>
                    : <ButtonItem onClick={()=> handleTabs(1)}>Videos</ButtonItem> }
                    {result.seasons && (tabIndex === 2 
                    ? <ButtonItem disabled>Seasons</ButtonItem>
                    : <ButtonItem onClick={()=> handleTabs(2)}>Seasons</ButtonItem> )}                    
                </ButtonContainer>        

                {tabIndex === 0 && (
                <ProductionContainer>
                    <Middletitle>Production Companies</Middletitle>     
                    <Middlename>{ result.production_companies && 
                        result.production_companies.map((company, index) => (
                        index === result.production_companies.length-1
                        ? company.name : `${company.name} / `                        
                        ))}
                    </Middlename>   
                    <Middletitle>Production Countries</Middletitle>
                    <Middlename>{ result.production_countries && 
                        result.production_countries.map((country, index) => (
                        index === result.production_countries.length-1
                        ? country.name : `${country.name} / `                        
                        ))}
                    </Middlename>   
                </ProductionContainer>
                )}

                
                {tabIndex === 1 && (<>
                <Middletitle>Videos</Middletitle>            
                <VideosContainer>{result.videos && result.videos.results && 
                    result.videos.results.map( video => (
                        <VideoItem>
                            <ReactPlsyer width="180px" height="120px" controls
                            url={`https://www.youtube.com/watch?v=${video.key}`} />
                        </VideoItem>
                    )  )
                }
                </VideosContainer> </> 
                )} 

                {tabIndex === 2 && 
                    result.seasons && <Middletitle>Seasons</Middletitle> }
                {tabIndex === 2 && result.seasons &&
                <SeasonsContainer>                
                {result.seasons.map(season => (
                    <Link to={`/season/${result.id}/${season.season_number}`}> 
                    <SeasonsItem>
                    <SeasonsImage bgImage={season.poster_path 
                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                        : require("../../assets/noPosterSmall.png").default} />  
                        <SeasonsName>{season.name}</SeasonsName>
                    </SeasonsItem> 
                    </Link>
                )
                )}   
                </SeasonsContainer> } 
                            
            </Data>            
        </Content>
    </Container>
    );

DetailPresenter.propTypes ={
    result:PropTypes.object,
    error:PropTypes.string, 
    loading:PropTypes.bool.isRequired,
    tabIndex:PropTypes.number.isRequired,
    handleTabs:PropTypes.func.isRequired
};

export default DetailPresenter;