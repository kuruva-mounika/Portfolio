// Typing effect for role line
const roles = ["Problem Solver", "Python Learner", "Aspiring Developer", "CSE Undergraduate"];
const roleEl = document.getElementById('typedRole');
let ri = 0, ci = 0, deleting = false;

function typeLoop(){
  const current = roles[ri];
  if(!deleting){
    ci++;
    roleEl.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
    if(ci === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    ci--;
    roleEl.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
    if(ci === 0){
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// Terminal "script" output
const termLines = [
  { k: '&gt;&gt;&gt; ', s: "name = 'Mounika Kuruva'" },
  { k: '&gt;&gt;&gt; ', s: "course = 'B.Tech CSE'" },
  { k: '&gt;&gt;&gt; ', s: "cgpa = 8.1" },
  { k: '&gt;&gt;&gt; ', s: "skills = ['Python', 'C', 'HTML', 'CSS']" },
  { k: '&gt;&gt;&gt; ', s: "print(f'Hello, I am {name}')", out: "Hello, I am Mounika Kuruva" },
];
const termBody = document.getElementById('terminalBody');
let li = 0;

function typeTerminal(){
  if(li >= termLines.length) return;
  const line = termLines[li];
  const div = document.createElement('div');
  div.className = 'terminal-line';
  termBody.appendChild(div);
  const fullText = line.k + line.s;
  let idx = 0;
  const interval = setInterval(()=>{
    idx++;
    div.innerHTML = '<span class="k">' + line.k + '</span><span class="s">' + line.s.slice(0, idx - line.k.length > 0 ? idx - line.k.length : 0) + '</span>';
    if(idx >= fullText.length){
      clearInterval(interval);
      if(line.out){
        const outDiv = document.createElement('div');
        outDiv.className = 'terminal-line out';
        outDiv.textContent = line.out;
        termBody.appendChild(outDiv);
      }
      li++;
      setTimeout(typeTerminal, 350);
    }
  }, 18);
}
setTimeout(typeTerminal, 600);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el=>observer.observe(el));
