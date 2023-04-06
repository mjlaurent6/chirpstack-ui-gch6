import React, { Component } from "react";

import {Space, Card, Button, Form, Input } from "antd";

import {Device} from "@chirpstack/chirpstack-api-grpc-web/api/device_pb";

interface IProps {
    device: Device;
}

interface IState {

}

class DeviceSearch extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {

        };
    }

    renderView = () => {
        return (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
                <Card>
                    <h3>
                        Health Check
                    </h3>
                    <p>
                        <Button>
                            Health Check
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

export default DeviceSearch;
