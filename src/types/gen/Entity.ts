import { Component } from "./Component";
import { Name } from "./Name";
import { Damage } from "./Damage";

export type Entity = {
	Name? : Name, 
	Damage? : Damage
}