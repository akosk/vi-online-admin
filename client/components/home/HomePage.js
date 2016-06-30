import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button,Panel } from 'react-bootstrap';
import { Link } from 'react-router';


class HomePage extends Component {


  render() {
    return (
      <div>

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <img className="img-responsive" src="/images/vallalkozni_szeretnel_honlapra_SZ2020.jpg" alt=""/>
          </div>
        </div>

        <div className="row text-center well " style={{marginTop:62}}>
          <div className="col-sm-6">
            <h6> Amennyiben már regisztrált, jelentkezzen be!</h6>
            <Link to="/login"> <Button bsStyle="primary">Bejelentezés</Button></Link>
          </div>
          <div className="col-sm-6">
            <h6> Még nem regisztrált? Tegye meg most!</h6>
            <Link to="/registration"> <Button bsStyle="primary">Regisztráció</Button> </Link>
          </div>
        </div>

        <div className="row  " style={{marginTop:62}}>
          <h4>
            Vállalkoznál? Fiatal vagy, nem tanulsz, nem dolgozol és saját lábra állnál? Most 3.000.000 Ft-ra
            jelentkezhetsz!
          </h4>

          <div >
            A 18-30 éves álláskeresők most 3.000.000 Ft induló támogatásra pályázhatnak.
          </div>
          <hr/>
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
              jelentkezhetnek
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
            teljesítésével kapják meg a vállalkozásindításhoz szükséges kompetenciákat, megszerezhetik az alapvető jogi,
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
          <hr/>
          <p>
            <span >A vállalkozások pénzbeli támogatásáról bővebb információ a második, B komponens felhívásában található, amely innen tölthető le:&nbsp;</span>
            <h5 >
              <a href="https://www.palyazat.gov.hu/ginop-523-16-fiatalok-vllalkozv-vlsa-vllalkozs-indtsi-kltsgeinek-tmogatsa-1">GINOP-5.2.3-16 Fiatalok vállalkozóvá válása - Vállalkozás indítási költségeinek támogatása</a>
            </h5>
          </p>
        </div>
      </div >
    );
  }
}

export default HomePage;
