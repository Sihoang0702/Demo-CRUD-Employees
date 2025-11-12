import { kv } from '@vercel/kv';

interface IEmployee {
    id: number;
    name: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
}

const DB_KEY = 'employees';

async function getEmployees(): Promise<IEmployee[]> {
    const data = await kv.get<IEmployee[]>(DB_KEY);
    return data || [];
}

export default async function handler(req: Request) {
    const { method } = req;
    const url = new URL(req.url);

    try {
        // GET: /api/employees
        if (method === 'GET') {
            const employees = await getEmployees();
            return new Response(JSON.stringify(employees), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // POST: /api/employees
        if (method === 'POST') {
            const body: Omit<IEmployee, 'id'> = await req.json();
            const employees = await getEmployees();

            const newEmployee: IEmployee = {
                ...body,
                id: Date.now(),
            };

            employees.push(newEmployee);
            await kv.set(DB_KEY, employees);

            return new Response(JSON.stringify(newEmployee), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // PUT: /api/employees (body có id)
        if (method === 'PUT') {
            const body: Partial<IEmployee> & { id: number } = await req.json();
            const { id, ...updates } = body;
            const employees = await getEmployees();

            const index = employees.findIndex((e) => e.id === id);
            if (index === -1) {
                return new Response(JSON.stringify({ error: 'Employee not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            employees[index] = { ...employees[index], ...updates };
            await kv.set(DB_KEY, employees);

            return new Response(JSON.stringify(employees[index]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // DELETE: /api/employees?id=123
        if (method === 'DELETE') {
            const id = Number(url.searchParams.get('id'));
            if (!id || isNaN(id)) {
                return new Response(JSON.stringify({ error: 'ID is required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const employees = await getEmployees();
            const filtered = employees.filter((e) => e.id !== id);
            await kv.set(DB_KEY, filtered);

            return new Response(null, { status: 204 });
        }

        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}