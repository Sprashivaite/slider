import { Model } from "../Model";
import { View } from "../View";
import { Presenter } from "../Presenter";

let model: Model;
let view: View;
let presenter: Presenter;

beforeEach(function () {
  view = new View();
  presenter = new Presenter();
});


describe("наличие инстансa класса Presenter", () => {
    it("Presenter", () => { 
        
      expect(presenter).toBeDefined();
    });
  });

describe("работа метода presenter.moveButton", () => {
    it("presenter.moveButton", () => { 
      spyOn(presenter, 'moveButton');
      presenter.moveButton
      

    });
  });