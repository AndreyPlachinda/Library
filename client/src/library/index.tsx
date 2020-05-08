import {Layout} from "antd";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as React from "react";
import {MainInfoComponent} from "./mainPage";
const { Content } = Layout;

export const MainComponent: React.FC = () => {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ background: 'white' }}>
                    <Content>
                        <Switch>
                            <Route exact path="/" component={MainInfoComponent} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
};