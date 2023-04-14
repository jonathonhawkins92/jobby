import BaseInterface from "../utils/interface";

import { IdsInterface } from "./ids/interface";
import { OverviewInterface } from "./overview/interface";

class Interface extends BaseInterface {
	private origin = "/company";

	static instance: Interface = new Interface("/company");

	public overview = new OverviewInterface(this.origin);
	public ids = new IdsInterface(this.origin);
}

export const JobInterface = Interface.instance;
export default Interface.instance;
