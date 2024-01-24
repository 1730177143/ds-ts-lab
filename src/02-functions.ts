import {friends, colleagues} from './01-basics'
import {Friend, Colleague} from './myTypes'

function older(f: Friend): string {
    f.age += 1
    return `${f.name} is now ${f.age}`
}

function allOlder(f: Friend[]) {
    let str: string[] = []
    for (let i = 0; i < f.length; i++) {
        str.push(older(f[i]))
    }
    return str
}

console.log(older(friends[0]));
console.log(allOlder(friends));

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}

function addColleague(cs: Colleague[], name: string, department: string, email: string): Colleague[] {
    let res: Colleague[] = cs;
    res.push({
        name: name,
        department: department,
        contact: {email: email, extension: highestExtension(cs).contact.extension + 1}
    });
    return res
}

console.log(highestExtension(colleagues.current));
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));