import { Model } from "../Model"
import {View} from '../View';
import {Presenter} from '../Presenter';

describe('наличие инстансов классов', ()=>{
    it('Model', ()=>{
    const model: Model = new Model();
    expect(model).toBeDefined();
    })
    it('View', ()=>{
        const view: View = new View();
expect(view).toBeDefined();
    })
    it('Presenter', ()=>{
        const presenter: View = new Presenter();
expect(presenter).toBeDefined();
    })
})
