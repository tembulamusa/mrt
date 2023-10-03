import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import NewMemoForm from "./new-memo-form";
import MemoServices from "./memo-service";

const NewMemoTabs = (props) => {
    const [key, setKey] = useState("memo");
    return (
        <div>
            <Tabs
                id="new-memo-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                <Tab eventKey="memo" title="Memo">
                    <NewMemoForm />
                </Tab>
                <Tab eventKey="services" title="Services (6)">
                    <MemoServices />
                    <br />
                </Tab>
            </Tabs>
        </div>
    )
};

export default NewMemoTabs;