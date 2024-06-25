import { Injectable } from '@nestjs/common';
import Flutterwave from 'flutterwave-node-v3';


@Injectable()
export class FlutterwaveService {
    private flutterwave: Flutterwave;

    constructor(){
        this.flutterwave = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
    }

    public CreateVirtualAccount = async (email: string): Promise<any> => {
        try{
            const response = await this.flutterwave.VirtualAcct.create({email})
            if(response.status === "success" && response.message === "Virtual account created"){
                return response.data
            }else{
                throw new Error(response.message)
            }
        }catch(error: any){
            throw new Error(error)
        }
    }
}
