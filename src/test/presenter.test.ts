import { Model } from "../Model";
import { View } from "../View";
import { Presenter } from "../Presenter";

let model: Model;
let view: View;
let presenter: Presenter;

describe("наличие инстансa класса Presenter", () => {
    it("Model", () => { 
        presenter = new Presenter();
      expect(presenter).toBeDefined();
    });
  });