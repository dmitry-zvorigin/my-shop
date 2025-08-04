<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'kfa2' , 'logo' => 'kfa2.png', 'description' => ''],
            ['name' => 'dexp' , 'logo' => 'dexp.png', 'description' => ''],
            ['name' => 'ardorgaming' , 'logo' => 'ardor gaming.png', 'description' => ''],
            ['name' => 'finepower' , 'logo' => 'fine power.png', 'description' => 'FinePower – производитель и поставщик качественных бытовых инструментов, ремонтного оборудования, а также сезонной техники и садового инструмента с наилучшим сочетанием цены и качества. Бренд FinePower начинал свою историю с производства и продажи устройств, связанных с электропитанием: адаптеров, блоков питания, стабилизаторов напряжения и аккумуляторов. Немного позже компания смогла объединить весь накопленный опыт и новые технологии и создала отдельную линейку инструментов, обеспечив ей полную техническую поддержку. Так появился продукт достойного качества, подходящий под любые потребности пользователя. Бренд за короткий период завоевал доверие и уважение среди потребителей и стал незаменимым помощником в достижении их целей. Наши основные продукты: электроинструменты на единой аккумуляторной платформе, элементы питания, ручной инструмент, инструмент для точных работ, сезонная техника, садовый инструмент. Современный электроинструмент – это обязательный помощник при любом ремонте и строительстве, независимо от размера стройплощадки: квартиры, дачи или стройки дома. Он не просто позволяет сделать работу быстрее, но и улучшает ее качество. Инструменты FinePower – ваш незаменимый помощник в решении любых задач!'],
            ['name' => 'reoka' , 'logo' => 'reoka.png', 'description' => ''],
            ['name' => 'xiaomi' , 'logo' => 'xiaomi.png', 'description' => ''],
            ['name' => 'apple' , 'logo' => 'apple.png', 'description' => ''],
            ['name' => 'samsung' , 'logo' => 'samsung.png', 'description' => ''],
            ['name' => 'haier' , 'logo' => 'haier.png', 'description' => ''],
            ['name' => 'msi' , 'logo' => 'msi.png', 'description' => ''],
            ['name' => 'lg' , 'logo' => 'lg.png', 'description' => ''],
            ['name' => 'honor' , 'logo' => 'honor.png', 'description' => ''],
            ['name' => 'asus' , 'logo' => 'asus.png', 'description' => ''],
            ['name' => 'gorenje' , 'logo' => 'gorenje.png', 'description' => ''],
            ['name' => 'palit' , 'logo' => 'palit.png', 'description' => ''],
            ['name' => 'polaris' , 'logo' => 'polaris.png', 'description' => ''],
            ['name' => 'indesit' , 'logo' => 'indesit.png', 'description' => ''],
        ];

        foreach ($brands as $data) {
            Brand::create([
                'name' => $data['name'],
                'logo' => $data['logo'],
                'description' => $data['description'],
            ]);
        }
    }
}
