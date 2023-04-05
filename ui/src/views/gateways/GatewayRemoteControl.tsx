import React, { Component } from "react";

import moment from "moment";
import {Space, Card, Button, Form, Input } from "antd";

import {
  Gateway,
  GenerateGatewayClientCertificateRequest,
  GenerateGatewayClientCertificateResponse,
} from "@chirpstack/chirpstack-api-grpc-web/api/gateway_pb";
import GatewayStore from "../../stores/GatewayStore";
import * as mqtt from "mqtt";

interface IProps {
  gateway: Gateway;
}

interface IState {
  certificate?: GenerateGatewayClientCertificateResponse;
  buttonDisabled: boolean;
}

class GatewayRemoteControl extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      certificate: undefined,
      buttonDisabled: false,
    };
  }

  pushMessage = () => {
      GatewayStore.sendMqttMessage(`${this.props.gateway.getGatewayId()}/restart`);
  };

  renderView = () => {
    return (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
            {console.log(this.props.gateway)}
            <Card>
                <h3>
                    Health Check
                </h3>
                <p>
                    <Button onClick={this.pushMessage} disabled={this.state.buttonDisabled}>
                        Health Check
                    </Button>
                </p>
            </Card>
            <Card>
                <h3>
                    Restart Gateway
                </h3>
                <p>
                    <Button onClick={this.pushMessage} disabled={this.state.buttonDisabled}>
                        Restart Gateway
                    </Button>
                </p>
            </Card>
            <Card>
                <h3>
                    Ping Gateway
                </h3>
                <p>
                    <Button onClick={this.pushMessage} disabled={this.state.buttonDisabled}>
                        Ping Gateway
                    </Button>
                </p>
            </Card>
        </Space>
    );
  };

  render() {
    return this.renderView();
  }
}

export default GatewayRemoteControl;
