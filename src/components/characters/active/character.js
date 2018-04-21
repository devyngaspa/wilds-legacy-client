import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Row, Col} from 'react-grid-system'

import AlchemistPortrait from '../../../assets/images/alchemist_portrait.jpg'
import BerserkerPortrait from '../../../assets/images/berserker_portrait.jpg'
import ConjurerPortrait from '../../../assets/images/conjurer_portrait.jpg'
import EagleEyePortrait from '../../../assets/images/eagle_eye_portrait.jpg'
import TrackerPortrait from '../../../assets/images/tracker_portrait.jpg'
import HuntressPortrait from '../../../assets/images/huntress_portrait.jpg'
import PhoenixMagePortrait from '../../../assets/images/phoenix_mage_portrait.jpg'
import SerpentMagePortrait from '../../../assets/images/serpent_mage_portrait.jpg'
import BeastmasterPortrait from '../../../assets/images/beastmaster_portrait.jpg'
import PathfinderPortrait from '../../../assets/images/pathfinder_portrait.jpg'
import ShamanPortrait from '../../../assets/images/shaman_portrait.jpg'
import SurvivalistPortrait from '../../../assets/images/survivalist_portrait.jpg'


class Character extends Component {

  render() {
    var portrait = null;
    switch (this.props.character.character_tmpl.name) {
      case 'Alchemist':
        portrait = AlchemistPortrait;
        break;
      case 'Beastmaster':
        portrait = BeastmasterPortrait;
        break;
      case 'Berserker':
        portrait = BerserkerPortrait;
        break;
      case 'Conjurer':
        portrait = ConjurerPortrait;
        break;
      case 'Huntress':
        portrait = HuntressPortrait;
        break;
      case 'Eagle Eye':
        portrait = EagleEyePortrait;
        break;
      case 'Phoenix Mage':
        portrait = PhoenixMagePortrait;
        break;
      case 'Serpent Mage':
        portrait = SerpentMagePortrait;
        break;
      case 'Tracker':
        portrait = TrackerPortrait;
        break;
      case 'Survivalist':
        portrait = SurvivalistPortrait;
        break;
      case 'Pathfinder':
        portrait = PathfinderPortrait;
        break;
      case 'Shaman':
        portrait = ShamanPortrait;
        break;
    }
    const portrait_style = {
      width:           '150px',
      height:          '150px',
      backgroundImage: `url(${portrait})`,
      backgroundSize:  'cover',
      border: '1px solid black',
      borderRadius: '3px'
    }
    const character = this.props.character

    var occupation_text_color = null

    switch (character.occupation_text) {
      case 'Ready':
        occupation_text_color = '#41873f'
        break
      case 'On Expedition':
        occupation_text_color = '#e8a829'
        break
      case 'Ready':
        occupation_text_color = '#e85229'
        break
    }

    return (
      <li style={{padding: '10px 0', borderBottom: '2px solid black'}}>
        <Container>
          <Row >
            <div style={portrait_style}>
            </div>
            <Col md={3}>
              <h3>{character.name}</h3>
              <p><i>{character.character_tmpl.name}</i></p>
              <p style={{marginBottom: '5px'}}><span style={{fontSize: '30px', marginRight: '0.5em'}}>Level {character.level.value}</span></p>
              <div style={{height: '10px', width: '100px', border: '1px solid black'}}>
                <div style={{height: '10px', width: (((character.xp/character.level.xp_max)*100).toString() + '%'), background: 'purple'}}></div>
              </div>
            </Col>
            <Col md={6}>
              <Row nogutter>
                <h3 style={{marginBottom: '0'}}>Stats</h3>
              </Row>
              <Row nogutter>
                <Col sm={3}>
                  <p>Health: <b>{character.hp_current}</b> / <b>{character.hp_max}</b></p>
                </Col>
                <Col sm={4}>
                  <p>Warmth: <b>{character.wp_current}</b> / <b>{character.wp_max}</b></p>
                </Col>
              </Row>
              <Row nogutter>
                <table>
                  <thead>
                    <tr>
                      <th style={{fontWeight: 'normal', fontSize: '14px'}}>Ferocity</th>
                      <th style={{fontWeight: 'normal', fontSize: '14px'}}>Endurance</th>
                      <th style={{fontWeight: 'normal', fontSize: '14px'}}>Quickness</th>
                      <th style={{fontWeight: 'normal', fontSize: '14px'}}>Resilience</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>{character.stats.ferocity}</b></td>
                      <td><b>{character.stats.endurance}</b></td>
                      <td><b>{character.stats.quickness}</b></td>
                      <td><b>{character.stats.resilience}</b></td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </Col>
            <Col md={1}>
              <p style={{color: occupation_text_color, textAlign: 'right'}}><i>{character.occupation_text}</i></p>
            </Col>
          </Row>
        </Container>
      </li>
    )
  }

}

export default Character
