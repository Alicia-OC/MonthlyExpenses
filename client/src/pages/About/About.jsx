import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <div className="card">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          ultricies lacinia aliquet. Quisque vel justo eget sapien cursus
          rhoncus. Suspendisse ac placerat diam. Maecenas auctor, mi nec rutrum
          hendrerit, quam quam dignissim urna, ut lacinia nisl nulla a risus.
          Nullam porttitor felis a nisi dapibus mollis. Integer molestie lorem
          at orci lobortis, quis tincidunt elit semper. Curabitur non leo vitae
          quam euismod elementum. Proin euismod, diam et sollicitudin venenatis,
          augue purus egestas nisi, eget fermentum urna ex non libero.
          Suspendisse lacinia lectus id magna efficitur lobortis. Maecenas
          elementum augue vel nisl eleifend, non porttitor mauris condimentum.
          In imperdiet purus nisi, quis aliquet turpis cursus sed. Integer vel
          viverra ante. Aenean ut consectetur sapien. Pellentesque ac convallis
          felis. Aliquam tincidunt dignissim posuere. Aenean nec iaculis ex. In
          libero justo, pretium sed convallis id, dictum laoreet risus. Nunc in
          ligula vehicula, pretium risus pellentesque, volutpat leo. Phasellus
          ipsum dolor, tempor ac luctus eu, porttitor vel ipsum. Morbi placerat
          a velit nec feugiat. Integer scelerisque nisl mi, id fringilla tortor
          iaculis sed. Quisque aliquam nibh est, ac sodales elit tincidunt ac.
          Cras ac dignissim sapien. Vestibulum lectus leo, consequat eu posuere
          porttitor, fermentum non ex. Duis egestas eu lorem sit amet egestas.
          Cras neque purus, facilisis at urna id, egestas molestie mi. Vivamus
          viverra interdum tortor, eget efficitur justo porta quis. Donec
          semper, purus ac ullamcorper porta, eros erat egestas ex, eu auctor
          est diam vel sapien. Nulla arcu ligula, dignissim in tincidunt nec,
          aliquam hendrerit leo. Etiam sed maximus nunc, sed vehicula nisi.
          Vivamus porttitor diam nec justo pharetra, non auctor nibh lobortis.
          Nunc dictum non ante non placerat. Fusce ut mattis est, ac venenatis
          ipsum. Donec accumsan convallis tortor vulputate rhoncus. Nullam id
          leo bibendum, consectetur nibh non, ullamcorper orci. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Donec iaculis ex fringilla nisi lacinia, quis dapibus
          nibh varius. Integer hendrerit, nulla hendrerit tempor cursus, nunc
          sapien fringilla augue, non feugiat sem turpis ut nunc. Sed aliquet
          ipsum diam, id rhoncus magna lobortis porttitor. Vestibulum at
          ullamcorper leo. Praesent ullamcorper odio sit amet urna rutrum
          dapibus et ut nunc. Donec tincidunt vitae justo in commodo. Fusce in
          quam facilisis, placerat enim in, ornare elit. Mauris varius mi
          mauris, ac aliquam nisl fringilla a. Sed accumsan, magna a luctus
          gravida, orci tellus tempor ante, quis porta ipsum dui et nibh.
          Integer eget dapibus libero, ut tincidunt tellus. In rhoncus ex ipsum,
          vel tincidunt eros consequat non. Curabitur dapibus elementum sem, ut
          consectetur massa egestas at. Nunc pulvinar nisi vel imperdiet
          posuere. Nullam gravida eget mi eget aliquam. Aenean sollicitudin
          justo tellus, vel blandit nunc faucibus id. Proin mollis ipsum ut
          dolor dictum faucibus. Donec in congue arcu. Donec rutrum lacus quis
          imperdiet ornare. Nulla mattis arcu quis orci consectetur gravida.
          Quisque vestibulum luctus metus. Vestibulum facilisis dolor et nibh
          volutpat posuere.
        </p>
        <a href={import.meta.env.VITE_APP_LINKEDIN}>Contact me</a>{' '}
      </div>
    </Container>
  );
};

export default About;
