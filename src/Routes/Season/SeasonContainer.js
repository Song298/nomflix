import { tvApi } from "api";
import React from "react";
import SeasonPresenter from "./SeasonPresenter";


export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            result: null,
            error: null,
            loading: true            
        };
    }
    async componentDidMount() {        
        const {match : {params: {id, number}},
               history : {push}
            } = this.props;
        
        const parsedId = parseInt(id);
        if( isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        try{
           ({data : result} = await tvApi.season(parsedId,number));            
           console.log(result);
        }catch {
            this.setState({error: "Can't find anything"});
        }finally{
            this.setState({loading:false, result});
        }
    }
    render() {        
        const {result, error,loading} = this.state;
        
        return <SeasonPresenter 
            result={result} 
            error={error} 
            loading={loading}
        />
    }
}