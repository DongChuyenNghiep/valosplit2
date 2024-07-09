import React,{useState} from 'react';
import { Link, BrowserRouter, Router } from "react-router-dom";
import '../css/bracket.css'
import '../css/loser-bracket-play-in.css'
import '../css/valorant.css'
export default function Playoff() {
    document.title = "Vòng loại trực tiếp"
    return (
        <>
            <div className="back">
                <Link to='/swissstage'> &lt; Swiss-stage</Link>
            </div>
            <div className='button-play-off'>
            <button  className='active'>
                <Link to='/playoff'>Nhánh Play-off</Link>
            </button>
            <button>
                <Link to='/dataplayoff'>Match Data</Link>
            </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '30px', fontWeight: 700, marginBottom: '5px', color: 'white' }}>
                PLAY-OFF
            </p>
            <div className="all" style={{ paddingRight: '30px !important' }}>
                <div className="bracket">
                    <h2 style={{ margin: 0, padding: 0 }}>Upper Bracket (Nhánh thắng)</h2>
                    <section className="round semifinals">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup">
                                    <div className="participants">
                                        <div className="participant">
                                            <img id="teamSemi1" src="" />
                                            <span id="semi-team-1"></span>
                                            <span className="score" id="semi-score-1"></span>
                                        </div>
                                        <div className="participant">
                                            <img id="teamSemi2" src="" />
                                            <span id="semi-team-2"></span>
                                            <span className="score" id="semi-score-2"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="matchup">
                                    <div className="participants">
                                        <div className="participant">
                                            <img id="teamSemi3" src="" />
                                            <span id="semi-team-3"></span>
                                            <span className="score" id="semi-score-3"></span>
                                        </div>
                                        <div className="participant">
                                            <img id="teamSemi4" src="" />
                                            <span id="semi-team-4"></span>
                                            <span className="score" id="semi-score-4"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="connector">
                                <div className="merger"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                    </section>
                    <section className="round finals">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup">
                                    <div className="participants">
                                        <div className="participant">
                                            <img id="teamfinal1" src="" />
                                            <span id="teamfinal-1"></span>
                                            <span className="score" id="score-final-1"></span>
                                        </div>
                                        <div className="participant">
                                            <img id="teamfinal2" src="" />
                                            <span id="teamfinal-2"></span>
                                            <span className="score" id="score-final-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="connector total-final">
                                <div className="merger"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="loser-bracket">
                    <h2>Lower Bracket (Nhánh thua)</h2>
                    <section className="round loser1">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup">
                                    <div className="participants">
                                        <div className="participant">
                                            <img id="teamLower1" src="" />
                                            <span id="team-lower-1"></span>
                                            <span className="score" id="score-lower-1"></span>
                                        </div>
                                        <div className="participant">
                                            <img id="teamLower2" src="" />
                                            <span id="team-lower-2"></span>
                                            <span className="score" id="score-lower-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="connector">
                                <div className="line"></div>
                            </div>
                        </div>
                    </section>
                    <section className="round loser2">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup">
                                    <div className="participants">
                                        <div className="participant">
                                            <img id="teamSemilower1" src="" />
                                            <span id="semi-lower-1"></span>
                                            <span className="score" id="semi-lowerscore-1"></span>
                                        </div>
                                        <div className="participant">
                                            <img id="teamSemilower2" src="" />
                                            <span id="semi-lower-2"></span>
                                            <span className="score" id="semi-lowerscore-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="round grand-final">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup">
                                    <div className="participants">

                                        <div className="participant"><img id="advance-grandFinal-team-1" src="" /><span
                                            id='teamgrandFinal-1'></span><span className="score" id="score-grandFinal-1"></span>
                                        </div>
                                        <div className="participant"><img id="advance-grandFinal-team-2" src="" /><span
                                            id='teamgrandFinal-2'></span><span className="score" id="score-grandFinal-2"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="connector" >
                                <div className="line" style={{ marginTop: '-304px', width: '50px', borderBottom: '2.5px white solid' }}></div>
                            </div>
                        </div>
                    </section>
                    <section className="round champion">
                        <div className="winners">
                            <div className="matchups">
                                <div className="matchup" style={{ marginTop: '-256px', marginRight: '20px' }}>
                                    <div className="participants">

                                        <div className="participant advance"><img id="champion1st" src="" /><span
                                            id='teamgrandChampion'></span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
