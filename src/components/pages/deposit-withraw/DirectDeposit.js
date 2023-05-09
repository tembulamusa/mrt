
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Index from '../../../assets/img/payment_logos/airtel2.PNG'
import Mpesa from '../../../assets/img/payment_logos/mpesa2.PNG'
import Tigo from '../../../assets/img/payment_logos/tigo2.PNG'
import Halo from '../../../assets/img/payment_logos/halo2.PNG'


const   DirectDeposit = (props) => {
  return (
  	<div className="unstyled-tabs deposit-tabs image-tabs">
			<div className="direct-deposit">
				<h4 className="uppercase">How to Deposit on phone</h4>
			</div>
		
    <Tabs
      defaultActiveKey="tigo"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="tigo" title={<img style={{width: "60px"}} src={Tigo} alt="Logo"/>}>
      <h4>KUWEKA PESA KUPITIA TIGOPESA</h4>
        <ol className="normal-ol normal-list">
        	<li>Piga *150*01#</li>
			<li>Chagua 4 Lipa kwa TIGOPESA</li>
			<li>Chagua 3 Weka namba ya kampuni/biashara: 101010</li>
			<li>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</li>
			<li>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</li>

        </ol>
      </Tab>

      <Tab eventKey="mpesa" title={<img style={{width: "60px"}} src={Mpesa} alt="Logo"/>}>
        <h4>KUWEKA PESA KUPITIA M-PESA</h4>
        <ol>
			<li>Piga *150*00#</li>
			<li>Chagua 4 Lipa kwa M-PESA</li>
			<li>Chagua 4 Weka namba ya kampuni/biashara: 101010</li>
			<li>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</li>
			<li>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</li>
		</ol>

      </Tab>

      <Tab eventKey="airtel" title={<img style={{width: "60px"}} src={Index} alt="Logo"/>}>
        <h4>KUWEKA PESA KUPITIA AIRTEL MONEY</h4>
		<ol>
		<li>Piga *150*60#</li>
		<li>Chagua 5 Lipa bili</li>
		<li>Chagua 4 Weka namba ya kampuni/biashara: 101010</li>
		<li>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</li>
		<li>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</li>
		</ol>
      </Tab>

      <Tab eventKey="halo" title={<img style={{width: "60px"}} src={Halo} alt="Logo"/>}>
        <h4>KUWEKA PESA KUPITIA HALOPESA</h4>
		<ol>
			<li>Piga *150*88#</li>
			<li>Chagua 4 Lipa bili</li>
			<li>Chagua 3 Ingiza namba ya kampuni/biashara: 101010</li>
			<li>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</li>
			<li>Weka kiasi: XX,XXX/= , Na namba ya siri alafu bonyeza moja kuthibitisha.</li>
		</ol>
      </Tab>

    </Tabs>
    </div>
  );
}


export default DirectDeposit
