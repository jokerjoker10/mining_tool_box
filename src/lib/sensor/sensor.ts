
export interface Sensor {
    checkSensor(options: SensorOption): Promise<boolean>
}

export class SensorOption {

}