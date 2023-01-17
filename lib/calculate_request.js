export async function calculate(n) {
  const response = await fetch('/api/calculate?' + new URLSearchParams({ for: n.toString() }))
  return await response.json();
}