(() => {
  'use strict';
  const c = window.geauxLaunch || {};
  const money = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:2}).format(n);
  const goal = Number.isFinite(c.goal) && c.goal > 0 ? c.goal : 300;
  const raised = Number.isFinite(c.raised) && c.raised >= 0 ? c.raised : null;
  document.querySelectorAll('[data-goal]').forEach(el => el.textContent = money(goal));
  document.getElementById('fund-goal').textContent = `${money(goal)} goal — Texas LLC formation`;
  const progress = document.getElementById('fund-progress');
  if (raised !== null) {
    document.getElementById('fund-total').textContent = `${money(raised)} raised of ${money(goal)}`;
    progress.max = goal; progress.value = Math.min(raised, goal); progress.hidden = false;
    progress.setAttribute('aria-valuetext', `${money(raised)} raised toward ${money(goal)}`);
  }
  if (typeof c.updated === 'string' && c.updated.trim()) document.getElementById('fund-updated').textContent = `Manually updated: ${c.updated}`;
  function safeURL(value, hosts) {
    try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && hosts.includes(u.hostname) ? u.href : null; } catch { return null; }
  }
  const support = safeURL(c.supportURL, ['buymeacoffee.com', 'www.buymeacoffee.com']);
  const discord = safeURL(c.discordURL, ['discord.gg', 'discord.com']);
  const beta = safeURL(c.testFlightURL, ['testflight.apple.com']);
  for (const [selector, url] of [['[data-support]',support],['[data-discord]',discord]]) {
    if (url) document.querySelectorAll(selector).forEach(a => a.href = url);
  }
  const betaLink = document.querySelector('[data-beta]');
  if (beta) { betaLink.href = beta; betaLink.textContent = 'Join the TestFlight Beta'; betaLink.target = '_blank'}
  else if (discord) { betaLink.href = discord; }
  const names = Array.isArray(c.supporters) ? c.supporters.filter(n => typeof n === 'string' && n.trim()).slice(0,200) : [];
  const list = document.getElementById('supporter-list');
  names.forEach(name => { const li = document.createElement('li'); li.textContent = name.trim().slice(0,80); list.append(li); });
  document.getElementById('supporter-empty').hidden = names.length > 0;
})();
