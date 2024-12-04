// this class that is used to store the state of the application
export class AppState {
    // create a property that is used to store the state of the application
    private state: any = {};

    // create a method that is used to update the state of the application
    public setState(newState: any): void {
        this.state = newState;
    }

    // create a method that is used to get the state of the application
    public getState(): any {
        return this.state;
    }
}

// a calculate age snippet implemented in typescript with a static method
export class Calculateage {
  static run(birthday: string): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}

/*
Access modifiers:
•	private: Alleen beschikbaar binnen de class zelf.
•	protected: Beschikbaar binnen de class én subklassen.
•	public: Optioneel om te vermelden, maar standaard voor alles.

In een Vite-omgeving met moderne frameworks kan een heldere scheiding tussen private, 
protected, en public handig zijn voor complexe componentlogica of services.

Geen # voor private in typescript!!!
*/