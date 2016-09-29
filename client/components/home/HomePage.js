import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button,Panel } from 'react-bootstrap';
import { Link } from 'react-router';


class HomePage extends Component {


  render() {
    return (
      <div>

        <div style={{ height:600,backgroundSize:'cover',backgroundImage:'url(/images/img_header8.jpg)'}}>

        </div>

        <div className="row text-center  well" style={{padding:'24px 0px 24px 0px',marginTop:0,marginBottom:0}}>
          <div className="col-sm-6">
            <h4> Amennyiben már regisztrált, jelentkezzen be!</h4>
            <Link to="/login"> <Button bsStyle="primary">Bejelentezés</Button></Link>
          </div>
          <div className="col-sm-6">
            <h4> Még nem regisztrált? Tegye meg most!</h4>
            <Link to="/registration"> <Button bsStyle="primary">Regisztráció</Button> </Link>
          </div>
        </div>




        <div className="row" style={{marginTop:0,paddingBottom:180,backgroundColor:'#16A085',color:'white'}}>
          <div className="col-sm-8 col-sm-offset-2">

            <div style={{padding:60}}>
              <h1>
                Vállalkoznál?<br/>
                Fiatal vagy, nem tanulsz, nem dolgozol és saját lábra állnál?<br/>
                <br/>

                <p className="text-center">
                <span className="label label-warning">
              Most 3.000.000 Ft-ra jelentkezhetsz!
                  </span>
                </p>
              </h1>

            </div>

            <div>
              <h4>A program célja:</h4>
              <p>
                Magyarország területén új egyéni vagy mikro-vállalkozás indítását tervező, vállalkozói szemlélettel
                rendelkező fiatalok felkészítése saját vállalkozásuk indítására. Ennek érdekében a program segítséget
                nyújt üzleti tervük kialakításához ismeret és készségfejlesztéssel, valamint pénzügyi támogatással a
                jóváhagyott üzleti terv alapján indított vállalkozás induló költségeihez.<br/>
                A program az Ifjúsági Garancia Program keretében valósul meg, így a munkaviszonnyal és tanulói
                jogviszonnyal nem rendelkező fiatalok vállalkozóvá válásához nyújt segítséget.
              </p>
            </div>

            <ul>
              <li>
                A programban 18-25 év közötti (felsőfokú végzettségű pályakezdők esetén 25-30 éves) fiatalok vehetnek
                részt.
              </li>
              <li>
                A programba más vállalkozásban többségi üzletrésztulajdonnal (50% feletti) nem rendelkező fiatalok
                jelentkezhetnek.
              </li>
              <li>
                A jelentkező fiatalok közül azok kerülnek kiválasztásra, akik vállalkozás indításához megalapozott
                ötlettel, reális elképzeléssel, vállalkozói attitűd-del rendelkeznek.
              </li>
            </ul>

            <hr/>
            <h4>Mit nyújt a program?</h4>
            <p>A teljes program két komponens keretében valósul meg.<br/>
              <br/>
              A programba kerülő fiatalok az&nbsp;<b>első (A) komponens</b>&nbsp;keretében nyújtott képzési programok
              teljesítésével kapják meg a vállalkozásindításhoz szükséges kompetenciákat, megszerezhetik az alapvető
              jogi,
              pénzügyi, gazdálkodási, munkaszervezéssel, gazdálkodással és irányítással kapcsolatos ismereteket,
              megismerik a vállalkozási formák típusait, képessé válhatnak előkészíteni önfoglalkoztatóvá vagy
              vállalkozóvá válásuk lépéseit. A támogató szolgáltatásokon keresztül segítséget kapnak üzleti tervük
              összeállításához, illetve az indítási időszakban tanácsadás és mentorálás keretében kiemelt segítséget
              kapnak a jogszerű működéshez, az adótudatos vállalkozói magatartás kialakításához.<br/>
              <br/>
              A&nbsp;<b>második (B) komponens</b>&nbsp;keretében az elfogadott üzleti tervvel rendelkező, az első
              komponensben nyújtott képzési programokat eredményesen elvégző, vállalkozásukat megalapító fiatalok
              legfeljebb 3 millió Ft összegű, vissza nem térítendő támogatásban részesülnek az üzleti tervben rögzített
              költségeik támogatása céljából, 10% önrész mellett.
            </p>

          </div>
        </div >
      </div >
    );
  }
}

export default HomePage;
