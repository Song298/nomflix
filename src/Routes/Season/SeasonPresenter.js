import Loader from "Components/Loader";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

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


const OverView = styled.p`
    font-size: 12px;
    margin-top:5px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;
const Middletitle = styled.div`
    margin-top: 20px;
`;

const EpisodesContainer = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);    
    grid-column-gap: 20px;
    grid-row-gap: 30px;
    align-items: center;       
    
`;

const EpisodesImage = styled.div`
    background-image: url(${props => props.bgImage});
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    height: 150px;
    width: 120px;
    transition: opacity 0.1s linear;
`;
const EpisodesName = styled.div`
    padding-top: 5px;
    height: 25px;
`;
const EpisodesItem = styled.div`
    
`;




const SeasonPresenter = ({result, error,loading }) => (
    loading ? 
    <>
        <Helmet>
        <title>Loading | Nomflix</title>
        </Helmet>  
        <Loader /> 
    </>: 
    <Container>
        <Helmet>
        <title>{result.name}
         | Nomflix</title>
        </Helmet>  
   
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}/>
        <Content>
            <Cover bgImage={
                result.poster_path 
                 ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                 : require("../../assets/noPosterSmall.png").default    
            }
            />
            <Data>
                <Title>{result.name}</Title>
                <ItemContainer>
                    <Item>{result.air_date && result.air_date.substring(0,4)}
                    </Item>                                    
                </ItemContainer>
                <OverView>{result.overview}</OverView>
                {result.episodes && 
                <Middletitle>Episodes {result.episodes.length}</Middletitle>     }
                {result.episodes && 
                <EpisodesContainer>                
                {result.episodes.map(episode => (
                <EpisodesItem>
                    <EpisodesImage bgImage={episode.still_path 
                        ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                        : require("../../assets/noPosterSmall.png").default} />  
                    <EpisodesName>{episode.episode_number}.
                        {episode.name.length > 30 ? `${episode.name.substring(0,30)}...` : episode.name}</EpisodesName>
                </EpisodesItem>                     
                    )
                    )}   
                </EpisodesContainer>
                }
            </Data>            
        </Content>
    </Container>
    );

SeasonPresenter.propTypes ={
    result:PropTypes.object,
    error:PropTypes.string, 
    loading:PropTypes.bool.isRequired
};

export default SeasonPresenter;