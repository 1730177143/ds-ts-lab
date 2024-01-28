import {friends, colleagues} from './01-basics'
import {Friend, Colleague, EmailContact} from './myTypes'

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

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max?: number
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
        end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult = sorted.map((ce) => ({name: ce.name, email: ce.contact.email}));
    return fullResult.slice(0, end)
}

// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension), 3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length), 1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length)));

function findFriends(friends: Friend[], condition: (f: Friend) => boolean): string[] {
    return friends.filter(condition).map((f) => f.name);
}


console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));