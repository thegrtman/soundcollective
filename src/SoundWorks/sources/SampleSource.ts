/**
 * Created by Kevin on 4/14/2015.
 */
'use strict';

import BaseSource from './BaseSource';

class SampleSource extends BaseSource {

    constructor(options: { sample: number[]; repeat: boolean; }){
        var sample = options.sample;
        var repeat = options.repeat;

        var requestData: (startPoint: number, length: number) => number[];
        if(repeat){
            requestData = function(startPoint: number, length: number){
                var subSample: number[] = [];
                for(var i=0; i<length; i++){
                    subSample.push(sample[(i+startPoint)%sample.length]);
                }
                return subSample;
            };
        } else {
            requestData = function(startPoint: number, length: number){
                var subSample: number[] = [];
                for(var i=0; i<length; i++){
                    subSample.push(sample[i+startPoint] || 0);
                }
                return subSample;
            };
        }

        super({ requestData: requestData });
    }
}

export default SampleSource;