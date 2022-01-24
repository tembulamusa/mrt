import React, {useState, useEffect, useContext} from 'react';
import padlock from '../../assets/img/padlock.png';
import { Context }  from '../../context/store';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const clean = (_str) => {
    console.log("My String", _str)
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = () =>{
    return (
        <div className="btn btn-disabled draw" 
         style={{width:"100%", height:"30px", padding:"2px"}}>
         <span className="label label-inverse">
             <img style={{opacity:"0.3", width:"15px"}} src={padlock} alt="--" />
         </span>
        </div>
    );
}

const MatchHeaderRow = (props) => {
    return (
        <Container>
        <Row className="events-header">
            <div className="col-sm-8 left-text">
                <h3 className="main-heading-1">Soccer</h3>
            </div>
            <div className="col-sm-1">1</div>
            <div className="col-sm-1 events-odd">X</div>
            <div className="col-sm-1">2</div>
            <div className="col-sm-1 events-odd"></div>
        </Row>
        </Container>
    )
}

const addBet = () => {
   console.log("ADD BET");
}

const SideBets = (props) => {
    const {match, theMatch} = props;
    const [picked, setPicked] = useState();
    useEffect(()=>{
        setPicked(theMatch?.sub_type_id == match.sub_type_id ? ' picked': '');
    }, []);

    return (

        <div className={`col-sm-1 events-odd pad`} style={{height:"fit-content", display:"inline"}} >
            <a className={`side ${picked}`} 
                href={`match?id=${match.match_id}`}>+{match.side_bets}
            </a>
        </div>
    )

}

const OddButton = (props) => {
    const {theMatch, match, mkt} = props
    const [ucn, setUcn] = useState('');
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);

    useEffect(() => {
        if(match){
            let uc = clean(match.mathch_id + match.sub_type_id + (match[mkt] || 'draw') );
            setUcn(uc);
            let picked = (theMatch?.bet_pick == match[mkt] && 
                theMatch?.sub_type_id == match.sub_type_id) ?? 'picked';
            setPicked(picked);
        }
    }, []);
    
    useEffect(()=>{
        if(mkt == 'home_team'){
            setOddValue(match.odds.home_odd)
        }
        if(mkt == 'away_team'){
            setOddValue(match.odds.away_odd)
        }
        if(mkt == 'draw'){
            setOddValue(match.odds.neutral_odd)
        }
    }, [mkt]);


    return (
        <button 
            className={`home-team ${match.match_id} ${ucn} ${picked}`}
            hometeam={match.home_team}
            oddtype="1x2" 
            bettype='prematch'
            awayteam={match.away_team}
            oddvalue={oddValue}
            target="javascript:;" 
            odd-key={match[mkt]}
            parentmatchid={match.parent_match_id}
            id={match.match_id}
            custom={ ucn } 
            value={match.sub_type_id}
            special-value-value={0}
            onClick={addBet}>
                <span className="theodds">{oddValue}</span>
        </button>
    )
}



const MatchRow = (props) => {
    const [betslip, setBetslip] = useState([]);
    const {match} = props;

    useEffect(() => {
    }, [betslip]);

    return (
        <Row className="top-matches">
            <div className="col-sm-1 pad left-text">{match.start_time}</div>
            <div className="col-sm-7">
                <div className="compt-detail"> {match.category}| {match.competition_name}</div>
                <div className="compt-teams">{match.home_team}
                    <span className="opacity-reduce-txt vs-styling">vs</span>
                    {match.away_team}
                </div>
            </div>
            <Row className="col-3 m-0 p-0">
                <div className="col-sm-4 match-div-col" style={{padding:0}}>
                    { match?.odds?.home_odd 
                        ?  <OddButton match={match} theMatch={{}} mkt="home_team" /> 
                        :  <EmptyTextRow /> 
                    }
                </div>
                <div className="col-sm-4 events-odd match-div-col" style={{padding:0}}>
                    { match?.odds?.neutral_odd 
                        ?  <OddButton match={match} theMatch={{}} mkt="draw" /> 
                        :  <EmptyTextRow /> 
                    }
                </div>
                <div className="col-sm-4 match-div-col" style={{padding:0}}>
                    { match?.odds?.away_odd 
                        ?  <OddButton match={match} theMatch={{}} mkt="away_team" /> 
                        :  <EmptyTextRow /> 
                    }
                </div>
            </Row>
            <SideBets theMatch={{}} match={match} />
        </Row>
    )

} 
const MatchList = (props) => {
    const [state, dispatch] = useContext(Context);                              
    useEffect(()=>{
        console.log("Recedid a state change", state?.matches);
    }, [state?.matches])

    return (
        <div className="matches full-width">

            <MatchHeaderRow  />

            <Container className="web-element">
                { state?.matches?.map((match, key) => (
                        <MatchRow match={match}  key={key}/>
                   ))
                }
            </Container>
            { /* <Paginator /> */ }
        </div>
    )
}
export default MatchList;
