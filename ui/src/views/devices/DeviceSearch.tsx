import React, {Component} from "react";

import {Space, Card, Button, Form, Input, Row, Col, Descriptions} from "antd";

import {Device} from "@chirpstack/chirpstack-api-grpc-web/api/device_pb";
import Map, {Marker, MarkerColor} from "../../components/Map";
import DeviceStore from "../../stores/DeviceStore";
import {GetDevicesSummaryRequest} from "@chirpstack/chirpstack-api-grpc-web/api/internal_pb";
import {Link} from "react-router-dom";
import {Circle, FeatureGroup, LayerGroup, Popup} from "react-leaflet";
import {LatLngTuple, marker} from "leaflet";
import {Color} from "chart.js";


export type DeviceSearchUpLink = {
    gatewayId: string,
    rssi: number,
    snr: number,
    location: { altitude: number, latitude: number, longitude: number },
    estimatedRadius: number,
}

export type ColorOptions = {
    color: string,
    markerColor: MarkerColor,
}

const greenOptions: ColorOptions = {color: 'green', markerColor: 'green'}
const orangeOptions: ColorOptions = {color: 'orange', markerColor: 'orange'}
const purpleOptions: ColorOptions = {color: 'purple', markerColor: 'purple'}
const redOptions: ColorOptions = {color: 'red', markerColor: 'red'}
const blueOptions: ColorOptions = {color: 'blue', markerColor: 'blue'}
const color = [greenOptions, orangeOptions, purpleOptions, redOptions, blueOptions]


interface IProps {
    device: Device;
}

interface IState {
    deviceMetrics: DeviceSearchUpLink[]
}

class DeviceSearch extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            deviceMetrics: [],
        };
    }

    componentDidMount() {
        this.setState({
            deviceMetrics: DeviceStore.getSearchLocation()
        })
    }

    renderView = () => {
        const location: [number, number] = [22.309942, 114.258335];
        const location2: [number, number] = [22.319942, 114.258335];
        // console.log(this.state.deviceMetrics)
        return (
            <Space direction="vertical" style={{width: "100%"}} size="large">
                <Row gutter={24}>
                    <Col span={24}>
                        <Map height={600} center={location} zoom={15}>
                            {this.state.deviceMetrics &&
                                this.state.deviceMetrics.map(
                                    (item: DeviceSearchUpLink, idx: number) => {
                                        const location: LatLngTuple = [item.location!.latitude, item.location!.longitude]
                                        const fill = color[idx % 5];
                                        const markerColor: MarkerColor = fill.markerColor;
                                        return <FeatureGroup pathOptions={fill}>
                                            <Popup>{item.gatewayId}</Popup>
                                            <Circle
                                                center={location}
                                                radius={500}
                                            />
                                            <Marker position={location} faIcon="wifi" color={markerColor}/>
                                        </FeatureGroup>
                                    }
                                )
                            }
                        </Map>
                    </Col>
                </Row>
            </Space>
        );
    };

    render() {
        return this.renderView();
    }
}

export default DeviceSearch;
