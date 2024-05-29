import Image from 'next/image';

export default function Menu() {
  return (
    <div>
      <h1>Menu</h1>

      {/* Drinks section */}
      <section>
        <h2>Drinks</h2>

        <div>
          <div>
            <div>
              <Image src='' alt='' />
            </div>
            <p>Hot coffee</p>
          </div>
          <div>
            <div>
              <Image src='' alt='' />
            </div>
            <p>Cold coffee</p>
          </div>
          <div>
            <div>
              <Image src='' alt='' />
            </div>
            <p>Bottle Beverages</p>
          </div>
        </div>
      </section>

      {/* Drinks section */}
      <section>
        <h2>Food</h2>

        <div>
          <div>
            <div>
              <Image src='' alt='' />
            </div>
            <p>Bakery</p>
          </div>
          <div>
            <div>
              <Image src='' alt='' />
            </div>
            <p>Snacks and sweets</p>
          </div>
        </div>
      </section>
    </div>
  );
}
