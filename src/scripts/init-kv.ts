import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

async function init() {
    try {
        const dbPath = path.join(process.cwd(), 'db.json');

        // BƯỚC 1: Kiểm tra file có tồn tại không
        if (!fs.existsSync(dbPath)) {
            console.log('Không tìm thấy db.json ở thư mục gốc!');
            console.log('Vui lòng đặt db.json cùng cấp với package.json');
            return;
        }

        // BƯỚC 2: Đọc file (trong async)
        const raw = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(raw);

        // BƯỚC 3: Kiểm tra đã có data chưa
        const existing = await kv.get('employees');
        if (existing) {
            console.log('DB đã tồn tại. Bỏ qua import...');
            return;
        }

        // BƯỚC 4: Chuẩn hóa employees
        const employees = (db.employees || []).map((emp: any) => ({
            ...emp,
            id: Number(emp.id),
        }));

        const users = db.users || [];

        // BƯỚC 5: Lưu vào Vercel KV
        await kv.set('employees', employees);
        await kv.set('users', users);

        console.log(`Đã import ${employees.length} nhân viên`);
        console.log(`Đã import ${users.length} users`);
        console.log('Khởi tạo DB thành công!');
    } catch (error: any) {
        console.error('Lỗi khi khởi tạo DB:', error.message);
    }
}

// CHẠY
init();